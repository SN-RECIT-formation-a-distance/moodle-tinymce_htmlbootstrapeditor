$from = "moodle-tiny_htmlbootstrapeditor/src/*"
$to = "shared/recitfad4/public/lib/editor/tiny/plugins/htmlbootstrapeditor"
$source = "./src";

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}