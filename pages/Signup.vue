<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="flex justify-center pb-6">
          <img
            class="w-auto md:h-auto h-14"
            src="@/assets/images/logo.png"
            alt="Smartware"
          />
        </div>
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Sign Up
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Sign up to create a new account
          </p>
        </div>
        <div class="m-7">
          <form @submit.prevent="userResgister">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Name</label
              >
              <input
                id="name"
                v-model="register.name"
                type="name"
                name="name"
                maxlength="50"
                placeholder="Full Name"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                @input="nameValidation"
              />
              <p
                v-if="nameError"
                id="name-error"
                class="mt-2 text-xs text-red-600"
              >
                The name field is required
              </p>
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Email Address</label
              >
              <input
                id="email"
                v-model="register.email"
                type="email"
                name="email"
                placeholder="you@email.com"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                @input="emailValidation"
              />
              <p
                v-if="emailError"
                id="email-error"
                class="mt-2 text-xs text-red-600"
              >
                {{ emailErrorMsg }}
              </p>
            </div>
            <div class="mb-4">
              <div class="block mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Password</label
                >
              </div>
              <input
                id="password"
                v-model="register.password"
                type="password"
                name="password"
                placeholder="Password"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                @input="passwordValidation"
              />
            </div>
            <div class="mb-10">
              <div class="block mb-2">
                <label
                  for="confirmpassword"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Confirm Password</label
                >
              </div>
              <input
                id="confirmpassword"
                v-model="confirmPassword"
                type="password"
                name="confirmpassword"
                placeholder="confirmpassword"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring
                  focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                @input="passwordValidation"
              />
              <p
                v-if="passwordError"
                id="password-error"
                class="mt-2 text-xs text-red-600"
              >
                The password does not match
              </p>
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="
                  w-full
                  px-3
                  py-4
                  text-white
                  bg-indigo-500
                  rounded-md
                  focus:bg-indigo-600 focus:outline-none
                "
              >
                Sign up
              </button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Already have an account?
              <NuxtLink
                to="/login"
                class="
                  text-indigo-400
                  focus:outline-none focus:underline focus:text-indigo-500
                  dark:focus:border-indigo-800
                "
              >
                Login</NuxtLink
              >.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'SignUpLayout',
  auth: false,
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
      nameError: false,
      emailError: false,
      emailErrorMsg: 'The email field is require',
      confirmPassword: '',
      passwordError: false,
    };
  },
  methods: {
    async userResgister() {
      if (
        this.register.name.length !== 0 &&
        this.register.email.length !== 0 &&
        this.register.password.length !== 0 &&
        this.confirmPassword.length !== 0
      ) {
        if (this.passwordError === false) {
          try {
            await this.$axios
              .$post('/registeruser', {
                name: this.register.name,
                email: this.register.email,
                password: this.register.password,
                role: 'supplier',
              })
              .then(() => {
                this.$toast.success('Your account has been registered');
                try {
                  this.$auth
                    .loginWith('local', {
                      data: {
                        email: this.register.email,
                        password: this.register.password,
                      },
                    })
                    .then(() => {
                      this.$axios.setToken(this.$auth.token, 'Bearer');
                      this.$router.push('/');
                    });
                } catch (err) {
                  this.$toast.error(err);
                }
              });
          } catch (error) {
            this.$toast.error(error.response.data);
          }
        }
      } else if (
        this.register.name.length === 0 &&
        this.register.email.length !== 0 &&
        this.register.password.length !== 0
      ) {
        this.nameError = true;
      } else if (
        this.register.name.length !== 0 &&
        this.register.email.length === 0 &&
        this.register.password.length !== 0
      ) {
        this.emailError = true;
      } else if (
        this.register.name.length !== 0 &&
        this.register.email.length !== 0 &&
        this.register.password.length === 0
      ) {
        this.passwordError = true;
      } else if (
        this.register.name.length === 0 &&
        this.register.email.length === 0 &&
        this.register.password.length !== 0
      ) {
        this.nameError = true;
        this.emailError = true;
      } else if (
        this.register.name.length !== 0 &&
        this.register.email.length === 0 &&
        this.register.password.length === 0
      ) {
        this.emailError = true;
        this.passwordError = true;
      } else if (
        this.register.name.length === 0 &&
        this.register.email.length !== 0 &&
        this.register.password.length === 0
      ) {
        this.nameError = true;
        this.passwordError = true;
      } else {
        this.nameError = true;
        this.emailError = true;
        this.passwordError = true;
      }
    },
    nameValidation() {
      if (this.register.name.length !== 0) {
        this.nameError = false;
      } else {
        this.nameError = true;
      }
    },
    emailValidation() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.register.email.length !== 0) {
        if (re.test(this.register.email)) {
          this.emailError = false;
        } else {
          this.emailError = true;
          this.emailErrorMsg = 'Invalid Email';
        }
      } else {
        this.emailError = true;
        this.emailErrorMsg = 'The email field is required';
      }
    },
    passwordValidation() {
      if (this.register.password !== this.confirmPassword)
        this.passwordError = true;
      else this.passwordError = false;
    },
  },
};
</script>
