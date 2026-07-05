# Wok Dragon Menu OCR Audit

Generated with Pillow preprocessing and Tesseract OCR using `ell+eng --psm 6`. The script tries 0/90/180/270 degree rotations and keeps the highest-scoring result.

## Output Files

- `docs/menu-ocr/raw-text/ocr-page-XX.txt`: raw OCR text for each menu photo
- `docs/menu-ocr/preprocessed/page-XX-rot-*.png`: local preprocessed rotation candidates, ignored by git
- `docs/menu-ocr/current-menu-export.csv`: current website menu export

## OCR Page Results

| Page | Best rotation | Price token count | Word count | OCR price preview |
| ---: | ---: | ---: | ---: | --- |
| 01 | 0 | 1 | 195 | 18.90 |
| 02 | 0 | 1 | 371 | 36.90 |
| 03 | 0 | 11 | 371 | 4.90, 4.90, 5.90, 6.90, 5.90, 4.50, 4.50, 4.50, 8.90, 8.90, 9.90 |
| 04 | 270 | 16 | 284 | 3.90, 3.90, 4.90, 7.90, 3.00, 5.96, 4.30, 7.30, 7.30, 7.30, 7.30, 9.90, 6.90, 6.98, 3.00, 7.30 |
| 05 | 270 | 13 | 300 | 14.98, 14.98, 14.98, 15.98, 16.50, 14.96, 14.98, 14.90, 14.90, 14.90, 14.90, 11.98, 12.90 |
| 06 | 270 | 14 | 580 | 8.90, 11.50, 11.90, 10.90, 10.90, 13.50, 12.99, 12.50, 9.50, 12.00, 10.50, 12.50, 13.50, 13.90 |
| 07 | 270 | 8 | 308 | 3.00, 8.96, 11.50, 11.90, 10.90, 12.90, 13.50, 12.50 |
| 08 | 270 | 10 | 264 | 26.90, 16.50, 16.50, 14.90, 17.90, 65.00, 32.00, 24.90, 24.90, 24.90 |
| 09 | 270 | 6 | 249 | 13.90, 13.90, 13.90, 13.90, 13.90, 13.90 |
| 10 | 270 | 12 | 308 | 11.98, 11.90, 11.90, 11.90, 12.90, 11.90, 11.90, 11.90, 11.90, 11.90, 11.90, 12.90 |
| 11 | 270 | 15 | 344 | 11.90, 11.99, 11.90, 11.90, 15.90, 11.90, 11.90, 11.90, 11.90, 15.98, 13.50, 13.50, 13.50, 18.90, 712.99 |
| 12 | 270 | 10 | 311 | 15.90, 15.90, 5.90, 5.90, 18.98, 18.90, 15.90, 29.00, 29.00, 35.00 |
| 13 | 270 | 12 | 258 | 14.90, 17.90, 17.98, 17.90, 17.90, 15.90, 16.90, 16.50, 15.90, 15.90, 11.99, 15.90 |
| 14 | 270 | 20 | 457 | 8.90, 8.90, 8.96, 8.90, 8.90, 9.50, 9.50, 9.50, 8.90, 9.50, 9.96, 9.90, 10.90, 19.90, 10.90, 10.90, 9.90, 9.90, 9.90, 10.90 |
| 15 | 270 | 7 | 344 | 10.00, 5.50, 6.00, 6.00, 5.00, 6.50, 3.00 |
| 16 | 270 | 35 | 348 | 2.50, 2.50, 2.50, 2.50, 2.50, 2.50, 3.50, 3.50, 1.00, 2.50, 5.50, 4.00, 4.00, 4.00, 3.50, 3.50, 3.50, 6.50, 4.50, 9.90, 4.50, 6.00, 9.90, 25.00, ... |

## Rough Price Set Check

- Current website menu rows: 217
- Current website distinct prices: 50
- OCR distinct price tokens: 62

OCR can misread prices such as `8.90` as `8.99` or `6.90` as `6.99`, so this section is only a rough filter and not a final menu conclusion.

### Website prices not found by OCR

29.90, 34.90, 100.00

### OCR prices not present on website

5.96, 6.98, 8.96, 9.96, 11.98, 11.99, 12.99, 14.96, 14.98, 15.98, 17.98, 18.98, 19.90, 36.90, 712.99

## Suggested Next Step

1. Inspect noisy OCR pages in `raw-text`, especially where prices were read as `x.99`.
2. Use the OCR text as a candidate source only; final dish names and prices still need human confirmation.
3. Keep this workflow for future menu-photo audits instead of manually retyping every photo from scratch.
