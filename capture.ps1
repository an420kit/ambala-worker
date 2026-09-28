$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}
$artDir = "C:\Users\ankit\.gemini\antigravity-ide\brain\5db1512c-d2e8-4529-ac5c-0f0cfe106f7c"
if (-not (Test-Path $artDir)) {
    New-Item -ItemType Directory -Path $artDir -Force | Out-Null
}
$outPath = Join-Path $artDir "app_preview.png"
$userData = "$env:TEMP\edge_preview_user_$(Get-Random)"

$p = Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless",
    "--disable-gpu",
    "--virtual-time-budget=4000",
    "--window-size=430,932",
    "--user-data-dir=$userData",
    "--screenshot=$outPath",
    "http://localhost:8085/"
) -Wait -PassThru -NoNewWindow

Write-Host "Process exit code: $($p.ExitCode)"
if (Test-Path $outPath) {
    Write-Host "SUCCESS: Screenshot saved to $outPath"
} else {
    Write-Host "FAILED: Screenshot not generated"
}

