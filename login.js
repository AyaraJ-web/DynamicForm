const MenuImg = document.getElementById('mimg');
const MenuPage = document.querySelector('.menupage');
const Updates = document.querySelector('.updates');
const Logger = document.getElementById('log');
let trigger = 0;

let UserLog = {
    name: document.getElementById('name'),
    whatsapp: document.getElementById('tel')
};
const loader = document.getElementById('stand');

//Server protocols
const supabase_url = 'https://hpnlzexzsjcintahoymr.supabase.co';
const api_key = 'sb_publishable_2aH-L-xECkHkKF_p3uPPzA_QY6pdhmR';
const table = 'students';
const table_upd = 'updates';

function menu() {
    if ( trigger == 0) {
        MenuPage.style.left = '0px';
        MenuImg.src = 'closeM.png';
        trigger = 1;
    } else {
        MenuPage.style.left = '-100%';
        MenuImg.src = 'menu.png';
        trigger = 0;
    }
}

function update() {
    fetch(`${supabase_url}/rest/v1/${table_upd}?select=*&limit=1`,{
        headers: {
            'apikey': api_key,
            'Authorization': "Bearer "+api_key
        }
    })
    .then(res => res.json())
    .then(data => Updates.innerHTML = `<p>${data[0].head}</p><div>${data[0].body}</div>`);
}

function back() {
    let a = document.createElement('a');
    a.href = 'home.html';
    a.click();
}

function checkLog() {
    if (localStorage.getItem('DS-Login')=='yes') {
        Logger.style.visibility = 'hidden'
        update();
    }
}

function logIn() {
    loader.src = 'load-icon.png';
    loader.setAttribute('style','animation-play-state: running');
    fetch(`${supabase_url}/rest/v1/${table}?name=eq.${UserLog.name.value}&whatsapp=eq.${UserLog.whatsapp.value}&select=name,whatsapp`,{
        headers: {
            'apikey': api_key,
            'Authorization': "Bearer "+api_key
        }
    })
    .then(res => res.json())
    .then(data => {
        const check = data[0];
        if (check == undefined) {
            message('You have not been registered');
            loader.setAttribute('style','animation-play-state: paused');
            loader.src = 'laptop.png';
        } else if (check.name == UserLog.name.value && check.whatsapp == UserLog.whatsapp.value){
            Logger.style.visibility = 'hidden';
            localStorage.setItem('DS-Login','yes');
            update();
        }
    });
}

function message(mesg) {
    const pop = document.createElement('div');
    const popbtn = document.createElement('button');
    const brk  = document.createElement('p');
    pop.className = 'mesg';
    popbtn.className = 'mang';
    pop.innerHTML = mesg;
    popbtn.innerHTML = 'Got it';
    popbtn.onclick = ()=> {
        pop.remove()
    };
    brk.append(popbtn);
    pop.append(brk);
    document.body.append(pop);
}

function logOut() {
    localStorage.setItem('DS-Login','no');
    back();
}