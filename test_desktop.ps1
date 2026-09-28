$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}
$outPath = "C:\Users\ankit\.gemini\antigravity-ide\brain\93f07091-07a2-4e86-a998-d75cce09b383\desktop_view_check.png"
$userData = "$env:TEMP\edge_chk_$(Get-Random)"

Start-Process -FilePath $edgePath -ArgumentList @(
    "--headless=new",
    "--disable-gpu",
    "--virtual-time-budget=2000",
    "--window-size=1280,800",
    "--user-data-dir=$userData",
    "--screenshot=$outPath",
    "http://localhost:8085/"
) -Wait -NoNewWindow

if (Test-Path $outPath) {
    Write-Host "SUCCESS: Saved to $outPath"
} else {
    Write-Host "FAILED"
}
