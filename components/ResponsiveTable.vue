<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="pt-8 flex flex-col sm:px-6 lg:px-8">
    <div class="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
      <div
        v-if="loading"
        class="
          overflow-hidden
          flex
          justify-center
          max-h-80
          bg-white
          shadow
          rounded-lg
        "
      >
        <lottie-animation
          ref="animation"
          style="width: 150px"
          :animation-data="require('@/assets/lottie/loader.json')"
          :loop="true"
          :auto-play="true"
          :speed="1"
        />
      </div>
      <div v-else class="py-2 align-middle inline-block min-w-full">
        <div class="w-1/5 pl-1 pb-4 mt-5">
          <label for="search" class="sr-only">Search</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
              "
              aria-hidden="true"
            >
              <!-- Heroicon name: solid/search -->
              <svg
                class="mr-3 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              v-model="search"
              type="text"
              name="search"
              class="
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                pl-9
                sm:text-sm
                border-gray-300
                rounded-md
              "
              placeholder="Search"
            />
          </div>
        </div>
        <div
          class="shadow overflow-hidden border border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200 table-auto">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Company Name
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  #PO Reference Number
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  #Quantity
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Uploaded Date
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Remarks
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Basic
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Gross
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Preview</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in filteredData" :key="item._id">
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.company_name }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.po_reference_number }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  <span v-if="showMore === false">
                    {{ item.description.slice(0, 50) }}
                  </span>
                  <a
                    v-if="showMore === false"
                    class="text-sm text-indigo-600 hover:text-indigo-900"
                    @click="showMore = true"
                    >show more</a
                  >
                  <span v-if="showMore === true">
                    {{ item.description }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ dateFormat(item.uploaded_date) }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ dateFormat(item.due_date) }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.remarks }}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-normal
                    text-sm text-gray-500
                    capitalize
                  "
                >
                  {{ item.type }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.basic_amount | toCurrency }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {{ item.gross_amount | toCurrency }}
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  <button>
                    <!-- Preview Button -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  <button>
                    <!-- Edit Button -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav
            class="
              bg-gray-50
              px-4
              py-3
              flex
              items-center
              justify-between
              border-t border-gray-200
              sm:px-6
            "
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span class="font-medium">10</span>
                of
                <span class="font-medium">{{ filteredData.length }}</span>
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <button
                class="
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Previous
              </button>
              <button
                class="
                  ml-3
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import LottieAnimation from 'lottie-web-vue';

export default {
  name: 'UploadInvoice',
  components: {
    LottieAnimation,
  },
  filters: {
    toCurrency(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(value);
    },
  },
  data() {
    return {
      loading: true,
      showMore: false,
      data: {},
      search: '',
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => {
        return (
          item.company_name.toLowerCase().match(this.search.toLowerCase()) ||
          item.po_reference_number
            .toLowerCase()
            .match(this.search.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.getInvoice();
  },
  methods: {
    async getInvoice() {
      try {
        this.loading = true;
        const res = await this.$axios({
          method: 'get',
          url: '/vendorinvoice',
        });
        this.data = res.data;
      } catch (error) {
        this.$toast.error(error);
      }
      this.loading = false;
    },
    dateFormat(date) {
      dayjs.extend(LocalizedFormat);
      return dayjs(date).format('ll');
    },
  },
};
</script>
