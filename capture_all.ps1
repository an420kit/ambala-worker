$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}
$artDir = "C:\Users\ankit\.gemini\antigravity-ide\brain\93f07091-07a2-4e86-a998-d75cce09b383"

$pages = @(
    @{ Name = "final_login.png"; Url = "http://localhost:8085/index.html" },
    @{ Name = "final_admin.png"; Url = "http://localhost:8085/admin.html" },
    @{ Name = "final_worker.png"; Url = "http://localhost:8085/worker.html" },
    @{ Name = "final_customer.png"; Url = "http://localhost:8085/customer.html" }
)

foreach ($page in $pages) {
    $outPath = Join-Path $artDir $page.Name
    $userData = "$env:TEMP\edge_test_$(Get-Random)"
    Start-Process -FilePath $edgePath -ArgumentList @(
        "--headless=new",
        "--disable-gpu",
        "--virtual-time-budget=2000",
        "--window-size=1280,800",
        "--user-data-dir=$userData",
        "--screenshot=$outPath",
        $page.Url
    ) -Wait -NoNewWindow
    Write-Host "$($page.Name): $(Test-Path $outPath)"
}
