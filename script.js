const SUPABASE_URL = "https://vieaxpjxwnrdgqdorhgm.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable__tfzBTg1EWagfXLtUGW3JA_geJhv5Fb";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
); 
alert("JavaScript file is running!");
const M=document.getElementById("modal"),B=document.getElementById("modalBody");
function modal(t){
M.classList.add("on");
if(t==="login")B.innerHTML=`<h2>Welcome back</h2><p>Sign in to your fan account.</p><form onsubmit="login(event)"><div class="field"><label>Email</label><input id="le" type="email" required></div><div class="field"><label>Password</label><input id="lp" type="password" required></div><button class="btn full">Sign In</button></form><p class="notice">Create your fan account using your email and a secure password.</p>`;
if(t==="register")B.innerHTML=`<h2>Join Country Hearts</h2><p>Create your community profile.</p><form onsubmit="reg(event)"><div class="field"><label>Full name</label><input id="rn" required></div><div class="field"><label>Email</label><input id="re" type="email" required></div><div class="field"><label>Password</label><input id="rp" type="password" minlength="8" required></div><div class="field"><label><input id="ra" type="checkbox" required> I agree to the community terms and published drawing rules.</label></div><button type="submit" class="btn full">Create Account</button></form><p class="notice">Prototype only. Before launch, connect this form to secure authentication and a database.</p>`;
if(t==="entry")B.innerHTML=`<h2>Meet & Greet Entry</h2><p>First create a fan account so your entry can be associated with your profile.</p><div class="notice">The real promotion should display its official eligibility, entry period, selection method, prize details and required legal disclosures.</div><button class="btn full" onclick="modal('register')">Create Fan Account</button>`;
}
function closeModal(){M.classList.remove("on")}
async function reg(e) { 
    alert("Registration function started!");
    e.preventDefault();

    const name = rn.value.trim();
    const email = re.value.trim();
    const password = document.getElementById("rp").value;

    if (!name || !email || !password) {
        alert("Please enter your name, email, and password.");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (data.session) {
            update({
                name: name,
                email: email
            });

            B.innerHTML = `
                <div class="success">
                    <h2>Welcome, ${name}!</h2>
                    <p>Your fan account has been created successfully.</p>
                    <button class="btn full" onclick="closeModal()">
                        Continue
                    </button>
                </div>
            `;
        } else {
            B.innerHTML = `
                <div class="success">
                    <h2>Check Your Email</h2>
                    <p>We've received your registration. Please check your email to confirm your account before signing in.</p>
                    <button class="btn full" onclick="closeModal()">
                        Continue
                    </button>
                </div>
            `;
        }

    } catch (err) {
        console.error("Registration error:", err);
        alert("Registration failed. Please try again.");
    }
}
function login(e){e.preventDefault();let u=JSON.parse(localStorage.getItem("fanDemo")||"null");if(!u||u.email!==le.value){B.innerHTML+=`<p style="color:#9b302d">No matching demo account found on this device.</p>`;return}update(u);B.innerHTML=`<div class="success"><h2>Welcome back, ${u.name}!</h2><p>You are signed in to the demo account.</p><button class="btn full" onclick="closeModal()">Continue</button></div>`}
function update(u){document.getElementById("dashName").textContent=u.name;document.getElementById("dashEmail").textContent=u.email;document.getElementById("entryStatus").textContent="Account registered — entry available"}
window.addEventListener("load",()=>{let u=JSON.parse(localStorage.getItem("fanDemo")||"null");if(u)update(u)});
M.addEventListener("click",e=>{if(e.target===M)closeModal()});
