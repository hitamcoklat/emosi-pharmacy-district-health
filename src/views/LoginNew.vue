<template>
    <div class="loginWrap">
        <div class="sidenav">
            <div class="login-main-text">
                <h2 style="background-color:#000; float: left; padding: 0.5em;"><a style="color: white;">Login</a></h2>
                <p style="font-size: 2em; float: left; line-height: 1.2 !important; float: left;"><mark style="padding: 0 !important; background-color: #fff; color: black; margin: 0 !important;">Silahkan login menggunakan username dan password yang telah diberikan.</mark></p>
            </div>
        </div>
        <div style="height: 100%;" class="main">
            <div class="col-md-6 col-sm-12">
                <div style="border: 0 !important; margin-top: 10em;" class="card">
                    <article class="card-body">
                    <h4 class="card-title mb-4 mt-1">Sign in</h4>
                        <div v-if="dialog" class="alert alert-warning">
                            {{messageAlert}}
                        </div>                    
                        <div v-if="dialogLoading" class="alert alert-success">
                            <strong>Login Berhasil!</strong> Mohon tunggu...
                        </div>                    
                        <div v-if="dialogTunggu" class="alert alert-success">
                            <strong>Processing...</strong>
                        </div>                    
                        <div class="form-group">
                            <label>Masukan username</label>
                            <input name="" class="form-control form-control-lg" v-model="username" placeholder="Username" type="text">
                        </div> <!-- form-group// -->
                        <div class="form-group">
                            <label>Masukan Password</label>
                            <input class="form-control form-control-lg" v-model="password" placeholder="******" type="text">
                        </div> <!-- form-group// -->
                        <div class="form-group">
                        <label for="sel1">Pilih Jenis Login:</label>
                        <select style="color: black !important;" v-model="jenisLogin" class="form-control">
                            <option value="Login Kab/Kota">Login Kab/Kota</option>
                            <option value="Login Provinsi">Login Provinsi</option>
                        </select>
                        </div>                          
                        <div class="form-group">
                            <button style="background-color: #000; color: white;" @click="loginSubmit" class="btn btn-lg btn-block"> Login  </button>
                        </div> <!-- form-group// -->                                                           
                    </article>
                </div>
            </div>
        </div>  
    </div>
</template>
<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

html, body {
  font-family: 'Alata', sans-serif;
}

.loginWrap {
  font-family: 'Alata', sans-serif;
}

.main-head{
    height: 150px;
    background: #FFF;
   
}

.card {
    -webkit-box-shadow: 0px 2px 30px -6px rgba(173,163,173,1);
    -moz-box-shadow: 0px 2px 30px -6px rgba(173,163,173,1);
    box-shadow: 0px 2px 30px -6px rgba(173,163,173,1);    
}

.sidenav {
    height: 100%;
    /* background-color: #000; */
    background-image: url('https://ik.imagekit.io/igtoko/qrwe_27LMik3Tmyv.jpg');
    background-size: cover;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
} 
</style>
<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      dialogLoading: false,
      username: "",
      password: "",
      jenisLogin: "",
      dialogTunggu: false,
      messageAlert: "Username atau Password yang anda masukan salah!",
      items: ['Login Kab/Kota', 'Login Provinsi']
    }),     
    methods: {

        loginSubmit: function() {
            
            let data = {
                username: this.username,
                password: this.password
            }

            console.log(this.jenisLogin)

            if(this.jenisLogin == '') {
              this.dialog = true
              this.messageAlert = "Mohon Pilih Jenis Login Terlebih Dahulu!";
              return false;
            }

            this.dialogTunggu = true
            let urlLogin = (this.jenisLogin == 'Login Kab/Kota') ? this.$apiUrl + '/kabkot/login' : this.$apiUrl + '/login';
            this.$http.post(urlLogin, data)
              .then((response) => {
                  if(response.data.success == true) {
                    this.dialogLoading = true                  
                    this.dialogTunggu = false
                    setTimeout(() => {
                        this.dialogLoading = false
                        localStorage.setItem('token', response.data.api_token);
                        this.$store.commit('LOGIN_USER', response.data.message)
                        this.$router.push('/dashboard')                    
                    }, 2000);                    
                }else{
                  this.dialog = true
                }
              })

        }
    },
    mounted () {
      window.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
        //   this.loginSubmit()
          console.log('enter ditekan')
        }
      })
    },    
    created() {
      
    },
    beforeCreate () {
        console.log(this.$store.getters.isLogged)
        console.log(this.$store.getters.userData)
        if (this.$store.getters.isLogged) {
          this.isLoggedIn = this.$store.getters.isLogged
          this.$router.push('/dashboard')            
        }
    }   
  }
</script>