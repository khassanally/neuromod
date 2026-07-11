# Copy images from your local NeuroMod folder into the site assets directory.
# Usage: .\scripts\copy-neuromod-assets.ps1 -Source "C:\path\to\NeuroMod"

param(
    [Parameter(Mandatory = $true)]
    [string]$Source
)

$ErrorActionPreference = "Stop"
$dest = Join-Path $PSScriptRoot "..\assets" | Resolve-Path
$peopleDest = Join-Path $dest "people"

if (-not (Test-Path $Source)) {
    Write-Error "Source folder not found: $Source"
}

if (-not (Test-Path $peopleDest)) {
    New-Item -ItemType Directory -Path $peopleDest | Out-Null
}

Write-Host "Copying from: $Source"
Write-Host "Copying to:   $dest"

function Copy-IfFound {
    param(
        [string]$SearchPath,
        [string[]]$Patterns,
        [string]$TargetPath
    )

    foreach ($pattern in $Patterns) {
        $match = Get-ChildItem -Path $SearchPath -Filter $pattern -File -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($match) {
            Copy-Item -Path $match.FullName -Destination $TargetPath -Force
            Write-Host "  OK  $($match.Name) -> $(Split-Path $TargetPath -Leaf)"
            return
        }
    }

    Write-Warning "  Missing: $(Split-Path $TargetPath -Leaf) (looked for: $($Patterns -join ', '))"
}

Copy-IfFound $Source @("logo.jpg", "Logo.jpg", "LOGO.jpg") (Join-Path $dest "logo.jpg")
Copy-IfFound $Source @("*rtms*", "*rTMS*", "*RTMS*") (Join-Path $dest "rtms.jpg")
Copy-IfFound $Source @("*ect*", "*ECT*") (Join-Path $dest "ect.jpg")
Copy-IfFound $Source @("*tdcs*", "*tDCS*", "*TDCS*") (Join-Path $dest "tdcs.jpg")

$peopleSource = Join-Path $Source "people"
if (Test-Path $peopleSource) {
    Write-Host ""
    Write-Host "Copying team photos from: $peopleSource"

    $teamMembers = @(
        @{ Patterns = @("*whelan*", "*Whelan*"); Target = "michael-whelan.jpg" },
        @{ Patterns = @("*shah*armon*", "*Shah*Armon*", "*deepti*"); Target = "deepti-shah-armon.jpg" },
        @{ Patterns = @("*patel*", "*Patel*", "*anjali*"); Target = "anjali-patel.jpg" },
        @{ Patterns = @("*namis*", "*Namis*", "*jane*"); Target = "jane-namis.jpg" },
        @{ Patterns = @("*nomani*", "*Nomani*", "*erum*"); Target = "erum-nomani.jpg" },
        @{ Patterns = @("*chan*", "*Chan*", "*oliver*"); Target = "oliver-chan.jpg" },
        @{ Patterns = @("*hassanally*", "*Hassanally*", "*khalil*"); Target = "khalil-hassanally.jpg" }
    )

    foreach ($member in $teamMembers) {
        Copy-IfFound $peopleSource $member.Patterns (Join-Path $peopleDest $member.Target)
    }
} else {
    Write-Warning "No people subfolder found at: $peopleSource"
}

Write-Host ""
Write-Host "Done."
