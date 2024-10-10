var question = document.getElementById('question');
var answer = document.getElementById('answer');
var apiUrl = 'https://widipe.com/openai';
var form = document.getElementById('form');
var loader = document.getElementById('loader');
var plane = document.getElementById('plane');

loader.classList.add('hidden');

form.addEventListener("submit", async function (s) { // Pindahkan addEventListener ke luar fungsi sendReq agar tidak dipanggil berulang kali
    s.preventDefault();
    loader.classList.remove('hidden');
    plane.classList.add('hidden');
    
    try {
        const url = `${apiUrl}?text=${question.value}`; 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        } else {
            loader.classList.add('hidden');
            plane.classList.remove('hidden');
            question.value = "";
        }
        const data = await response.json();
        var htmlContent = renderApiResult(data.result);
        answer.innerHTML = htmlContent;

    } catch (error) {
        loader.classList.add('hidden'); // Pastikan loader disembunyikan juga jika terjadi error
        plane.classList.remove('hidden'); // Tampilkan kembali plane jika terjadi error
        alert(error.message);
    }
});

function renderApiResult(result) {
  let formattedHtml = result
    .replace(/```html([^`]+)```/g, '<pre><code>$1</code></pre>') 
    .replace(/### (.+)/g, '<h3>$1</h3>') 
    .replace(/\n/g, '<br>') 
    .replace(/\- (.+)/g, '<li>$1</li>') 
    .replace(/(\n\n)/g, '</p><p>') 
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  return `<p>${formattedHtml}</p>`; // Perbaiki template literal (``) agar fungsi bekerja
}
