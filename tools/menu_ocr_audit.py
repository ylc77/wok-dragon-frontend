from __future__ import annotations

import csv
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
TESSERACT = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")
PHOTO_DIR = Path(
    r"C:\Users\77\.codex\codex-remote-attachments\019f18df-e787-7900-8a90-8d5e02be5414"
    r"\07C33517-272F-4E89-BA18-84A2CEC86D73"
)
OUTPUT_DIR = ROOT / "docs" / "menu-ocr"
PREPROCESSED_DIR = OUTPUT_DIR / "preprocessed"
RAW_DIR = OUTPUT_DIR / "raw-text"
EXPORT_CSV = OUTPUT_DIR / "current-menu-export.csv"
REPORT_MD = OUTPUT_DIR / "menu-ocr-report.md"


@dataclass
class OcrCandidate:
    rotation: int
    text: str
    score: int
    price_count: int
    word_count: int


def natural_key(path: Path) -> list[int | str]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def ensure_dirs() -> None:
    PREPROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)


def preprocess_image(source: Path, rotation: int, page_num: int) -> Path:
    image = Image.open(source)
    image = ImageOps.exif_transpose(image)
    if rotation:
        image = image.rotate(rotation, expand=True)

    image = image.convert("L")
    target_width = 2400
    if image.width < target_width:
        ratio = target_width / image.width
        image = image.resize((target_width, int(image.height * ratio)), Image.Resampling.LANCZOS)

    image = ImageOps.autocontrast(image, cutoff=1)
    image = ImageEnhance.Contrast(image).enhance(1.7)
    image = ImageEnhance.Sharpness(image).enhance(1.4)
    image = image.filter(ImageFilter.MedianFilter(size=3))

    output = PREPROCESSED_DIR / f"page-{page_num:02d}-rot-{rotation}.png"
    image.save(output)
    return output


def run_tesseract(image_path: Path) -> str:
    result = subprocess.run(
        [
            str(TESSERACT),
            str(image_path),
            "stdout",
            "-l",
            "ell+eng",
            "--psm",
            "6",
        ],
        check=False,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    return result.stdout


def score_ocr(text: str) -> tuple[int, int, int]:
    prices = re.findall(r"\b\d{1,3}[\.,]\d{2}\s*EUR?", text)
    prices += re.findall(r"\b\d{1,3}[\.,]\d{2}\s*€?", text)
    menu_words = re.findall(
        r"\b(?:soup|rice|noodle|chicken|beef|pork|duck|shrimp|fried|sauce|salad|tea|wine|drink)\b",
        text,
        re.I,
    )
    greek_words = re.findall(r"[Α-Ωα-ω]{3,}", text)
    word_count = len(re.findall(r"\S+", text))
    score = len(prices) * 35 + len(menu_words) * 6 + len(greek_words) * 2 + min(word_count, 900)
    return score, len(prices), word_count


def best_ocr_for_photo(photo: Path, page_num: int) -> OcrCandidate:
    candidates: list[OcrCandidate] = []
    for rotation in (0, 90, 180, 270):
        processed = preprocess_image(photo, rotation, page_num)
        text = run_tesseract(processed)
        score, price_count, word_count = score_ocr(text)
        candidates.append(OcrCandidate(rotation, text, score, price_count, word_count))
    return max(candidates, key=lambda item: item.score)


def parse_objects(source: str, array_name: str) -> Iterable[str]:
    start = source.index(f"export const {array_name}")
    equals = source.index("=", start)
    array_start = source.index("[", equals)
    depth = 0
    object_start: int | None = None
    for idx in range(array_start, len(source)):
        char = source[idx]
        if char == "{":
            if depth == 0:
                object_start = idx
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and object_start is not None:
                yield source[object_start : idx + 1]
                object_start = None
        elif char == "]" and depth == 0:
            break


def read_prop(block: str, name: str) -> str:
    single = re.search(rf"{name}:\s*'([^']*)'", block)
    if single:
        return single.group(1)
    double = re.search(rf'{name}:\s*"([^"]*)"', block)
    return double.group(1) if double else ""


def export_current_menu() -> list[dict[str, str]]:
    source = (ROOT / "src" / "data" / "structuredMenuItems.ts").read_text(encoding="utf-8")
    rows: list[dict[str, str]] = []
    for block in parse_objects(source, "structuredMenuDishes"):
        if "categoryId:" not in block or "price:" not in block:
            continue
        spicy_match = re.search(r"spicyLevel:\s*(\d)", block)
        rows.append(
            {
                "number": read_prop(block, "number"),
                "categoryId": read_prop(block, "categoryId"),
                "nameEl": read_prop(block, "nameEl"),
                "nameEn": read_prop(block, "nameEn"),
                "nameZh": read_prop(block, "nameZh"),
                "price": read_prop(block, "price"),
                "spicyLevel": spicy_match.group(1) if spicy_match else ("1" if "spicy: true" in block else ""),
            }
        )

    with EXPORT_CSV.open("w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.DictWriter(
            csv_file,
            fieldnames=["number", "categoryId", "nameEl", "nameEn", "nameZh", "price", "spicyLevel"],
        )
        writer.writeheader()
        writer.writerows(rows)
    return rows


def price_tokens(text: str) -> list[str]:
    found = re.findall(r"\b\d{1,3}[\.,]\d{2}\b", text)
    return [item.replace(",", ".") for item in found]


def as_price(value: str) -> float:
    try:
        return float(value)
    except ValueError:
        return 9999.0


def write_report(results: list[dict[str, object]], menu_rows: list[dict[str, str]]) -> None:
    all_ocr_prices: list[str] = []
    for result in results:
        all_ocr_prices.extend(result["prices"])

    current_price_set = {row["price"] for row in menu_rows if row["price"]}
    ocr_price_set = set(all_ocr_prices)

    lines = [
        "# Wok Dragon Menu OCR Audit",
        "",
        "Generated with Pillow preprocessing and Tesseract OCR using `ell+eng --psm 6`. "
        "The script tries 0/90/180/270 degree rotations and keeps the highest-scoring result.",
        "",
        "## Output Files",
        "",
        "- `docs/menu-ocr/raw-text/ocr-page-XX.txt`: raw OCR text for each menu photo",
        "- `docs/menu-ocr/preprocessed/page-XX-rot-*.png`: local preprocessed rotation candidates, ignored by git",
        "- `docs/menu-ocr/current-menu-export.csv`: current website menu export",
        "",
        "## OCR Page Results",
        "",
        "| Page | Best rotation | Price token count | Word count | OCR price preview |",
        "| ---: | ---: | ---: | ---: | --- |",
    ]

    for result in results:
        prices = result["prices"]
        preview_prices = ", ".join(prices[:24])
        if len(prices) > 24:
            preview_prices += ", ..."
        lines.append(
            f"| {result['page']:02d} | {result['rotation']} | {len(prices)} | "
            f"{result['word_count']} | {preview_prices} |"
        )

    lines.extend(
        [
            "",
            "## Rough Price Set Check",
            "",
            f"- Current website menu rows: {len(menu_rows)}",
            f"- Current website distinct prices: {len(current_price_set)}",
            f"- OCR distinct price tokens: {len(ocr_price_set)}",
            "",
            "OCR can misread prices such as `8.90` as `8.99` or `6.90` as `6.99`, "
            "so this section is only a rough filter and not a final menu conclusion.",
            "",
            "### Website prices not found by OCR",
            "",
            ", ".join(sorted(current_price_set - ocr_price_set, key=as_price)) or "None",
            "",
            "### OCR prices not present on website",
            "",
            ", ".join(sorted(ocr_price_set - current_price_set, key=as_price)) or "None",
            "",
            "## Suggested Next Step",
            "",
            "1. Inspect noisy OCR pages in `raw-text`, especially where prices were read as `x.99`.",
            "2. Use the OCR text as a candidate source only; final dish names and prices still need human confirmation.",
            "3. Keep this workflow for future menu-photo audits instead of manually retyping every photo from scratch.",
        ]
    )

    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    if not TESSERACT.exists():
        raise SystemExit(f"Missing tesseract: {TESSERACT}")
    if not PHOTO_DIR.exists():
        raise SystemExit(f"Missing photo dir: {PHOTO_DIR}")

    ensure_dirs()
    photos = sorted(PHOTO_DIR.glob("*.jpg"), key=natural_key)
    results: list[dict[str, object]] = []

    for page_num, photo in enumerate(photos, start=1):
        best = best_ocr_for_photo(photo, page_num)
        raw_path = RAW_DIR / f"ocr-page-{page_num:02d}.txt"
        raw_path.write_text(best.text, encoding="utf-8")
        results.append(
            {
                "page": page_num,
                "photo": photo.name,
                "rotation": best.rotation,
                "score": best.score,
                "price_count": best.price_count,
                "word_count": best.word_count,
                "prices": price_tokens(best.text),
                "rawText": str(raw_path.relative_to(ROOT)),
            }
        )
        print(
            f"page {page_num:02d}: rotation={best.rotation}, prices={best.price_count}, "
            f"words={best.word_count}, score={best.score}"
        )

    (OUTPUT_DIR / "ocr-summary.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    menu_rows = export_current_menu()
    write_report(results, menu_rows)
    print(f"wrote {REPORT_MD.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
