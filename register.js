const UserLog = { 
  name: document.getElementById('name'),
  whatsapp: document.getElementById('number'),
  age: document.getElementById('age'),
  course: document.getElementById('course'),
  gender: document.getElementById('gender')
};

const Reset = document.getElementById('reset');
const DyForm = document.getElementById('stform');
const loader = document.getElementById('stand');

//Server protocols
const supabase_url = 'https://hpnlzexzsjcintahoymr.supabase.co';
const api_key = 'sb_publishable_2aH-L-xECkHkKF_p3uPPzA_QY6pdhmR';
const table = 'students';

DyForm.addEventListener('submit',ev=>{
  ev.preventDefault();
  
  loader.src = 'load-icon.png';
  loader.setAttribute('style','animation-play-state: running');
  fetch(`${supabase_url}/rest/v1/${table}?name=eq.${UserLog.name.value}&whatsapp=eq.${UserLog.whatsapp.value}&select=name,whatsapp`,{
    headers: {
        apikey: api_key,
        Authorization: "Bearer "+api_key
    }
  })
  .then(res => res.json())
  .then(data => {
    const check = data[0];
    if ( check == undefined) {
      fetch(`${supabase_url}/rest/v1/${table}`,{
        method: 'POST',
        headers: {
          'apikey': api_key,
          'Authorization': 'Bearer '+api_key,
          "Content-Type": "application/json",
          'Prefer': "return=representation"
        },
        body: JSON.stringify({
          name: UserLog.name.value,
          age: UserLog.age.value,
          course: UserLog.course.value,
          whatsapp: UserLog.whatsapp.value,
          gender: UserLog.gender.value
        })
      })
      .then(res => res.json())
      .then(succ =>{
        message('you are now registered');
        loader.setAttribute('style','animation-play-state: paused');
        loader.src = 'laptop.png';
        Reset.click();
      })
    } else if (check.name == UserLog.name.value && check.whatsapp == UserLog.whatsapp.value) {
      message('Sorry this details has been registered');
      loader.setAttribute('style','animation-play-state: paused');
      loader.src = 'laptop.png';
    } 
  })
});


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

function back() {
  let a = document.createElement('a');
  a.href = 'home.html';
  a.click();
}