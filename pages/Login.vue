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
            Sign in
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Log in to access your account
          </p>
        </div>
        <div class="m-7">
          <form @submit.prevent="userLogin">
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Email Address</label
              >
              <input
                id="email"
                v-model="login.email"
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
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Password</label
                >
                <label
                  class="
                    text-sm text-gray-400
                    focus:outline-none focus:text-indigo-500
                    hover:text-indigo-500
                    dark:hover:text-indigo-300
                  "
                  @click="showForgotPasswordPopUp"
                >
                  Forgot password?
                </label>
              </div>
              <input
                id="password"
                v-model="login.password"
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
              />
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
                Login
              </button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Don't have an account yet?
              <NuxtLink
                to="/signup"
                class="
                  text-indigo-400
                  focus:outline-none focus:underline focus:text-indigo-500
                  dark:focus:border-indigo-800
                "
              >
                Sign up</NuxtLink
              >.
            </p>
          </form>
        </div>
      </div>
    </div>
    <div
      v-if="forgotpassword"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-center
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-center
              bg-white
              rounded-lg
              px-4
              pt-5
              pb-4
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
            "
          >
            <div>
              <div class="sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  class="
                    bg-white
                    rounded-md
                    text-gray-400
                    hover:text-gray-500
                    focus:outline-none
                    focus:ring-1
                    focus:ring-offset-1
                    focus:ring-indigo-400
                  "
                  @click="hideForgotPasswordPopUp"
                >
                  <span class="sr-only">Close</span>
                  <!-- Heroicon name: outline/x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Send password to your email
                </h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Enter your registered email address</p>
                </div>
                <form class="mt-5 sm:flex sm:items-center">
                  <div class="w-full sm:max-w-xs">
                    <label for="email" class="sr-only">Email</label>
                    <input
                      id="forgotemail"
                      type="text"
                      name="forgotemail"
                      class="
                        shadow-sm
                        focus:ring-indigo-500 focus:border-indigo-500
                        block
                        w-full
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                      placeholder="you@example.com"
                    />
                  </div>
                  <button
                    type="submit"
                    class="
                      mt-3
                      w-full
                      inline-flex
                      items-center
                      justify-center
                      px-4
                      py-2
                      border border-transparent
                      shadow-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-indigo-600
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                      sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                    "
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'SignInLayout',
  data() {
    return {
      forgotpassword: false,
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.login,
          })
          .then(() => {
            this.$toast.success('Logged In!');
            this.$axios.setToken(this.$auth.token, 'Bearer');
            this.$router.push('/');
          });
      } catch (err) {
        this.$toast.error('Credentials are incorrect');
      }
    },
    showForgotPasswordPopUp() {
      this.forgotpassword = true;
    },
    hideForgotPasswordPopUp() {
      this.forgotpassword = false;
    },
  },
};
</script>
