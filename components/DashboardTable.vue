<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="pt-8 flex flex-col sm:px-6 lg:px-8">
    <div class="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
      <div v-if="loading" class="overflow-hidden flex justify-center max-h-80 bg-white shadow rounded-lg">
        <lottie-animation ref="animation" style="width: 150px" :animation-data="require('@/assets/lottie/loader.json')" :loop="true" :auto-play="true" :speed="1" />
      </div>
      <div v-else class="py-2 align-middle inline-block min-w-full">
        <div class="w-1/5 pl-1 pb-4 mt-5">
          <label for="search" class="sr-only">Search</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
              <!-- Heroicon name: solid/search -->
              <svg class="mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input id="search" v-model="search" type="text" name="search" class="focus:ring-blue-200 focus:border-blue-200 block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search" />
          </div>
        </div>
        <div class="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 table-auto">
            <thead class="bg-blue-900">
              <tr>
                <th scope="col" class="pl-3 pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Company Name</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#PO Reference</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#Quantity</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Uploaded Date</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Due Date</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Remarks</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Basic</th>
                <th scope="col" class="pr-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Gross</th>
                <th scope="col" class="relative">
                  <span class="sr-only">Preview</span>
                </th>
                <th scope="col" class="relative">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in filteredData" :key="item._id">
                <td class="pl-3 pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.company_name }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.po_reference_number }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.quantity }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500 text-justify">
                  {{ item.description }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ dateFormat(item.uploaded_date) }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ dateFormat(item.due_date) }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.remarks }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500 capitalize text-justify">
                  {{ item.type }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.basic_amount | toCurrency(item.currency) }}
                </td>
                <td class="pr-3 py-1 whitespace-normal text-sm text-gray-500">
                  {{ item.gross_amount | toCurrency(item.currency) }}
                </td>
                <td class="whitespace-normal text-sm text-gray-500">
                  <button v-if="item.file !== 'null'" class="focus:outline-none" @click="getPreview(item._id)">
                    <!-- Preview Button -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
                <td class="pr-3 whitespace-normal text-sm text-gray-500">
                  <button class="focus:outline-none" @click="showDeleteAlert = true">
                    <!-- Delete Button -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <DeleteAlert
                    v-show="showDeleteAlert"
                    :show-delete-alert="showDeleteAlert"
                    @close-delete-alert="showDeleteAlert = false"
                    @delete-vendor-invoice="
                      deleteInvoice(item._id);
                      showDeleteAlert = false;
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="bg-blue-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
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
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</button>
              <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
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
import DeleteAlert from './DeleteAlert.vue';

export default {
  name: 'UploadInvoice',
  components: {
    LottieAnimation,
    DeleteAlert,
  },
  filters: {
    toCurrency(value, currency) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      });
      return formatter.format(value);
    },
  },
  data() {
    return {
      loading: true,
      showMore: false,
      showDeleteAlert: false,
      data: {},
      search: '',
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => {
        return item.company_name.toLowerCase().match(this.search.toLowerCase()) || item.po_reference_number.toLowerCase().match(this.search.toLowerCase());
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
          method: 'GET',
          url: '/vendorinvoice',
        });
        this.data = res.data;
      } catch (error) {
        this.$toast.error(error);
      }
      this.loading = false;
    },
    async getPreview(id) {
      const res = await this.$axios({
        method: 'GET',
        url: `/vendorinvoice/file/${id}`,
      });

      const byteCharacters = atob(res.data.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: res.data.mimetype });
      const url = URL.createObjectURL(file);

      window.open(url);
    },
    async deleteInvoice(id) {
      const res = await this.$axios({
        method: 'DELETE',
        url: `/vendorinvoice/${id}`,
      });
      this.$toast.show(res.data);
      this.getInvoice();
    },
    dateFormat(date) {
      dayjs.extend(LocalizedFormat);
      return dayjs(date).format('ll');
    },
  },
};
</script>
