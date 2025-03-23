function humanFileSize(size) {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB'][i];
}

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('fileInfo').innerHTML = `Original Size: ${humanFileSize(file.size)}`;

    new Compressor(file, {
        quality: 0.6,
        success(result) {
            const compressedBlob = result;
            document.getElementById('fileInfo').innerHTML += `<br>Compressed Size: ${humanFileSize(compressedBlob.size)}`;
            
            const downloadBtn = document.getElementById('downloadBtn');
            const url = URL.createObjectURL(compressedBlob);
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = function() {
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
