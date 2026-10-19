const SUPABASE_URL = "https://vieaxpjxwnrdgqdorhgm.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable__tfzBTg1EWagfXLtUGW3JA_geJhv5Fb";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
); 
const M=document.getElementById("modal"),B=document.getElementById("modalBody");
function modal(t){
M.classList.add("on");
if(t==="login")B.innerHTML=`<h2>Welcome back</h2><p>Sign in to your fan account.</p><form onsubmit="login(event)"><div class="field"><label>Email</label><input id="le" type="email" required></div><div class="field"><label>Password</label><input id="lp" type="password" required></div><button class="btn full">Sign In</button></form><p class="notice">Prototype only. This demo does not securely process real accounts or passwords.</p>`;
if(t==="register")B.innerHTML=`<h2>Join Country Hearts</h2><p>Create your community profile.</p><form onsubmit="reg(event)"><div class="field"><label>Full name</label><input id="rn" required></div><div class="field"><label>Email</label><input id="re" type="email" required></div><div class="field"><label>Password</label><input id="rp" type="password" minlength="8" required></div><div class="field"><label><input id="ra" type="checkbox" required> I agree to the community terms and published drawing rules.</label></div><button class="btn full">Create Account</button></form><p class="notice">Prototype only. Before launch, connect this form to secure authentication and a database.</p>`;
if(t==="entry")B.innerHTML=`<h2>Meet & Greet Entry</h2><p>First create a fan account so your entry can be associated with your profile.</p><div class="notice">The real promotion should display its official eligibility, entry period, selection method, prize details and required legal disclosures.</div><button class="btn full" onclick="modal('register')">Create Fan Account</button>`;
}
function closeModal(){M.classList.remove("on")}
function reg(e){e.preventDefault();let u={name:rn.value,email:re.value};localStorage.setItem("fanDemo",JSON.stringify(u));update(u);B.innerHTML=`<div class="success"><h2>Welcome, ${u.name}!</h2><p>Your demo fan profile has been created. In a production site, secure account creation and the drawing entry would happen on the server.</p><button class="btn full" onclick="closeModal()">Continue</button></div>`}
function login(e){e.preventDefault();let u=JSON.parse(localStorage.getItem("fanDemo")||"null");if(!u||u.email!==le.value){B.innerHTML+=`<p style="color:#9b302d">No matching demo account found on this device.</p>`;return}update(u);B.innerHTML=`<div class="success"><h2>Welcome back, ${u.name}!</h2><p>You are signed in to the demo account.</p><button class="btn full" onclick="closeModal()">Continue</button></div>`}
function update(u){document.getElementById("dashName").textContent=u.name;document.getElementById("dashEmail").textContent=u.email;document.getElementById("entryStatus").textContent="Account registered — entry available"}
window.addEventListener("load",()=>{let u=JSON.parse(localStorage.getItem("fanDemo")||"null");if(u)update(u)});
M.addEventListener("click",e=>{if(e.target===M)closeModal()});
