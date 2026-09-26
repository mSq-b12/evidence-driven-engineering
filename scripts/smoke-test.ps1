$ErrorActionPreference = 'Stop'

function Invoke-Codex {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)
  $previousErrorAction = $ErrorActionPreference
  try {
    $ErrorActionPreference = 'SilentlyContinue'
    $output = & codex @Arguments 2>&1 | Out-String
    $exitCode = $LASTEXITCODE
    return [pscustomobject]@{ ExitCode = $exitCode; Output = $output }
  }
  finally {
    $ErrorActionPreference = $previousErrorAction
  }
}

$codex = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codex) {
  throw 'Codex CLI was not found on PATH. Install/update Codex CLI, then retry the smoke test.'
}

$repoRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$tempBase = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$tempRoot = Join-Path $tempBase ("codex-marketplace-smoke-" + [guid]::NewGuid().ToString('N'))
$expectedPrefix = $tempBase.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$resolvedTemp = [System.IO.Path]::GetFullPath($tempRoot)
if (-not $resolvedTemp.StartsWith($expectedPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to use a temporary Codex home outside the system temp directory: $resolvedTemp"
}

$previousCodexHome = $env:CODEX_HOME
try {
  New-Item -ItemType Directory -Path $resolvedTemp | Out-Null
  $env:CODEX_HOME = $resolvedTemp

  $addResult = Invoke-Codex @('plugin', 'marketplace', 'add', $repoRoot)
  if ($addResult.ExitCode -ne 0) { throw "Codex could not add the local marketplace (exit $($addResult.ExitCode)).`n$($addResult.Output)" }

  $listResult = Invoke-Codex @('plugin', 'marketplace', 'list')
  if ($listResult.ExitCode -ne 0) { throw "Codex could not list marketplaces (exit $($listResult.ExitCode)).`n$($listResult.Output)" }
  if ($listResult.Output -notmatch 'evidence-driven-engineering') {
    throw "Codex accepted the add command but did not list the expected marketplace.`n$($listResult.Output)"
  }

  $removeResult = Invoke-Codex @('plugin', 'marketplace', 'remove', 'evidence-driven-engineering')
  if ($removeResult.ExitCode -ne 0) { throw "Codex could not remove the temporary marketplace (exit $($removeResult.ExitCode)).`n$($removeResult.Output)" }
  $afterRemove = Invoke-Codex @('plugin', 'marketplace', 'list')
  if ($afterRemove.ExitCode -ne 0) { throw "Codex could not verify marketplace removal (exit $($afterRemove.ExitCode)).`n$($afterRemove.Output)" }
  if ($afterRemove.Output -notmatch '(?m)^\s*No plugin marketplaces in scope\.\s*$') {
    throw "The marketplace remained listed after removal.`n$($afterRemove.Output)"
  }
  Write-Output 'Codex CLI marketplace discovery smoke test passed in an isolated CODEX_HOME.'
}
finally {
  if ($null -eq $previousCodexHome) { Remove-Item Env:CODEX_HOME -ErrorAction SilentlyContinue }
  else { $env:CODEX_HOME = $previousCodexHome }

  if (Test-Path -LiteralPath $resolvedTemp) {
    $confirmedTemp = [System.IO.Path]::GetFullPath((Resolve-Path -LiteralPath $resolvedTemp).Path)
    if ($confirmedTemp -eq $resolvedTemp -and $confirmedTemp.StartsWith($expectedPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
      Remove-Item -LiteralPath $confirmedTemp -Recurse -Force
    } else {
      throw "Refusing to clean an unexpected path: $confirmedTemp"
    }
  }
}
