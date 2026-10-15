$shell = New-Object -ComObject Shell.Application
$folder = $shell.Namespace('D:\Design\motion_video\public\assets')
$file = $folder.ParseName('song.mp3')
for ($i = 0; $i -le 100; $i++) {
    $header = $folder.GetDetailsOf($null, $i)
    $val = $folder.GetDetailsOf($file, $i)
    if ($val) {
        Write-Output "$header ($i): $val"
    }
}
