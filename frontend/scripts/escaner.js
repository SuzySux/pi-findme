const d_secVideos = document.getElementById("secVideos");
const d_secInfo = document.getElementById("secInfo");
const d_secAgenda = document.getElementById("secAgenda");

const d_btnVideos = document.getElementById("btnVideos");
const d_btnInfo = document.getElementById("btnInfo");
const d_btnAgenda = document.getElementById("btnAgenda");

const d_btnCloseVideos = document.getElementById("btnCloseVideos");
const d_btnCloseInfo = document.getElementById("btnCloseInfo");
const d_btnCloseAgenda = document.getElementById("btnCloseAgenda");

d_btnVideos.onclick = () => { d_secVideos.classList.remove('hidden'); };
d_btnInfo.onclick = () => { d_secInfo.classList.remove('hidden'); };
d_btnAgenda.onclick = () => { d_secAgenda.classList.remove('hidden'); };

d_btnCloseVideos.onclick = () => { d_secVideos.classList.add('hidden'); };
d_btnCloseInfo.onclick = () => { d_secInfo.classList.add('hidden'); };
d_btnCloseAgenda.onclick = () => { d_secAgenda.classList.add('hidden'); };