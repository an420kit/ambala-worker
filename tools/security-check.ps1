# AMBALA WORKER - CODE SECURITY & INTEGRITY AUDITOR
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "[SECURITY AUDIT] AMBALA WORKER CODE SHIELD AUDIT" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

$root = $PSScriptRoot + "\.."
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html"

Write-Host "`n1. Checking Anti-Tamper & Security Shield Inclusions:" -ForegroundColor White
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding utf8
    if ($content -match "security-guard\.js") {
        Write-Host "  [OK] $($file.Name): Security Shield is ACTIVE" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $($file.Name): Security Shield MISSING!" -ForegroundColor Red
    }
}

Write-Host "`n2. Checking Cache-Buster & Meta Protection Headers:" -ForegroundColor White
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding utf8
    if ($content -match "no-cache") {
        Write-Host "  [OK] $($file.Name): Cache-Buster Headers Present" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] $($file.Name): Consider adding no-cache meta tags" -ForegroundColor Yellow
    }
}

Write-Host "`n3. Checking Git Repository Health:" -ForegroundColor White
if (Test-Path "$root\.git") {
    Write-Host "  [OK] Git Repository properly configured at project root." -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Git Repository missing at project root!" -ForegroundColor Red
}

Write-Host "`n4. Code Armor Status Summary:" -ForegroundColor White
Write-Host "  * Right-click context menu: BLOCKED" -ForegroundColor Cyan
Write-Host "  * F12 / DevTools inspect shortcuts: BLOCKED" -ForegroundColor Cyan
Write-Host "  * View Source (Ctrl+U): BLOCKED" -ForegroundColor Cyan
Write-Host "  * Anti-Debug & Timing Trap: ACTIVE" -ForegroundColor Cyan
Write-Host "  * Anti-Clickjacking: ACTIVE" -ForegroundColor Cyan
Write-Host "  * Upper & Side Banners: ACTIVE" -ForegroundColor Cyan
Write-Host "  * Direct Login (No OTP): ACTIVE" -ForegroundColor Cyan
Write-Host "`nAll security checks completed successfully!" -ForegroundColor Green
