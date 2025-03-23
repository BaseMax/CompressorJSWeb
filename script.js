function humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
}

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileInfo = document.getElementById('fileInfo');
    fileInfo.innerHTML = `Original Size: ${humanFileSize(file.size)}`;
    const quality = parseFloat(document.getElementById('quality').value);
    
    new Compressor(file, {
        quality: quality,
        success(result) {
            fileInfo.innerHTML += `<br>Compressed Size: ${humanFileSize(result.size)}`;
            
            const downloadBtn = document.getElementById('downloadBtn');
            const url = URL.createObjectURL(result);
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'compressed-image.jpg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        },
        error(err) {
            console.error(err.message);
        },
    });
});
