<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Vendor Invoice Upload
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Please fill all the required information before uploading
        </p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form class="space-y-6" enctype="multipart/form-data">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="vendor_company_name"
                class="block text-sm font-medium text-gray-700"
                >Vendor Company Name</label
              >
              <input
                id="vendor_company_name"
                v-model="company_name"
                type="text"
                name="vendor_company_name"
                autocomplete="given-name"
                class="
                  mt-1
                  focus:ring-indigo-500 focus:border-indigo-500
                  block
                  w-full
                  shadow-sm
                  sm:text-sm
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="po_refernece_number"
                class="block text-sm font-medium text-gray-700"
                >PO reference Number</label
              >

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
                >
                  <span class="text-gray-500 sm:text-sm"> # </span>
                </div>
                <input
                  id="po_reference_number"
                  v-model="po_reference_number"
                  type="text"
                  name="po_reference_number"
                  autocomplete="po_reference_number"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    pl-7
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="quantity"
                class="block text-sm font-medium text-gray-700"
                >Quantity</label
              >

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
                >
                  <span class="text-gray-500 sm:text-sm"> # </span>
                </div>
                <input
                  id="quantity"
                  v-model="quantity"
                  type="number"
                  name="quantity"
                  class="
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    pl-7
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >

              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea
                  v-model="description"
                  class="
                    resize-y
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                ></textarea>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-6 gap-6 mt-2">
            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                Date of Invoice Upload
              </label>
              <div class="mt-2 flex items-center space-x-5">
                {{ currentDate() }}
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <div class="mt-2 flex items-center space-x-5">
                <date-picker
                  v-model="due_date"
                  format="YYYY-MM-DD"
                  type="date"
                  placeholder="Select due date"
                ></date-picker>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="remarks"
                class="block text-sm font-medium text-gray-700"
                >Remarks</label
              >

              <div class="mt-1 relative rounded-md shadow-sm">
                <textarea
                  v-model="remarks"
                  class="
                    resize-y
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                ></textarea>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="invoice_type"
                class="block text-sm font-medium text-gray-700"
                >Invoice Type</label
              >
              <select
                id="invoice_type"
                v-model="type"
                name="invoice_type"
                class="
                  mt-1
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-base
                  border-gray-300
                  focus:outline-none
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  sm:text-sm
                  rounded-md
                "
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-l font-medium text-gray-700">
              Invoice Amount:
            </label>
            <div class="grid grid-cols-6 gap-6 mt-2 pb-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="invoice_amount_basic"
                  class="block text-sm font-medium text-gray-700"
                  >Basic</label
                >
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
                  >
                    <span
                      v-if="
                        currency_selected === 'USD' ||
                        currency_selected === 'CAD'
                      "
                      class="text-gray-500 sm:text-sm"
                    >
                      $
                    </span>
                    <span
                      v-if="currency_selected === 'EUR'"
                      class="text-gray-500 sm:text-sm"
                    >
                      €
                    </span>
                  </div>
                  <money
                    id="invoice_amount_basic"
                    v-model="basic_amount"
                    v-bind="moneyConfig"
                    type="text"
                    name="invoice_amount_basic"
                    class="
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      pl-7
                      pr-12
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    placeholder="0.00"
                    aria-describedby="basic-currency"
                  ></money>
                  <div
                    class="
                      absolute
                      inset-y-0
                      right-0
                      pr-3
                      flex
                      items-center
                      pointer-events-none
                    "
                  >
                    <span id="basic-currency" class="text-gray-500 sm:text-sm">
                      {{ currency_selected }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="invoice_amount_gross"
                  class="block text-sm font-medium text-gray-700"
                  >Gross</label
                >
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
                  >
                    <span
                      v-if="
                        currency_selected === 'USD' ||
                        currency_selected === 'CAD'
                      "
                      class="text-gray-500 sm:text-sm"
                    >
                      $
                    </span>
                    <span
                      v-if="currency_selected === 'EUR'"
                      class="text-gray-500 sm:text-sm"
                    >
                      €
                    </span>
                  </div>
                  <money
                    id="invoice_amount_gross"
                    v-model="gross_amount"
                    v-bind="moneyConfig"
                    type="text"
                    name="invoice_amount_gross"
                    class="
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      pl-7
                      pr-12
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    placeholder="0.00"
                    aria-describedby="gross-currency"
                  ></money>
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <label for="gross-currency" class="sr-only">Currency</label>
                    <select
                      id="gross-currency"
                      v-model="currency_selected"
                      name="gross-currency"
                      class="
                        focus:ring-indigo-500 focus:border-indigo-500
                        h-full
                        py-0
                        pl-2
                        pr-7
                        border-transparent
                        bg-transparent
                        text-gray-500
                        sm:text-sm
                        rounded-md
                      "
                    >
                      <option>USD</option>
                      <option>CAD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="file === null"
              class="
                mt-2
                flex
                justify-center
                px-6
                pt-5
                pb-6
                border-2 border-gray-300 border-dashed
                rounded-md
              "
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm justify-center text-gray-600">
                  <label
                    for="file-upload"
                    class="
                      relative
                      cursor-pointer
                      bg-white
                      rounded-md
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus-within:outline-none
                      focus-within:ring-2
                      focus-within:ring-offset-2
                      focus-within:ring-indigo-500
                    "
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      ref="file"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      class="sr-only"
                      @change="fileSelect()"
                    />
                  </label>
                  <!-- <p class="pl-1">or drag and drop</p> -->
                </div>
                <p class="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
              </div>
            </div>
            <ul
              v-else
              class="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
              <li
                class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
              >
                <div class="w-0 flex-1 flex items-center">
                  <!-- Heroicon name: solid/paper-clip -->
                  <svg
                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-2 flex-1 w-0 truncate">
                    {{ file.name }}
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0 flex space-x-4">
                  <label
                    class="
                      relative
                      cursor-pointer
                      bg-white
                      rounded-md
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus-within:outline-none
                      focus-within:ring-2
                      focus-within:ring-offset-2
                      focus-within:ring-indigo-500
                    "
                  >
                    <span>Update</span>
                    <input
                      id="file-upload"
                      ref="file"
                      name="file-upload"
                      type="file"
                      accept=".pdf"
                      class="sr-only"
                      @change="fileSelect()"
                    />
                  </label>
                  <span class="text-gray-300" aria-hidden="true">|</span>
                  <button
                    type="button"
                    class="
                      bg-white
                      rounded-md
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                    "
                    @click="file = null"
                  >
                    Remove
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <button
                type="button"
                class="
                  ml-3
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
                @click="upload"
              >
                Upload Invoice
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Money } from 'v-money';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'UploadInvoice',
  components: { Money, DatePicker },
  data() {
    return {
      company_name: null,
      po_reference_number: null,
      quantity: null,
      description: null,
      due_date: null,
      remarks: null,
      type: null,
      basic_amount: 0,
      gross_amount: 0,
      currency_selected: 'USD',
      file: null,
      fileFormData: null,

      moneyConfig: {
        decimal: '.',
        thousands: ',',
        precision: 2,
        masked: false,
      },
    };
  },
  head: {
    title: 'Smartware - Upload Invoice',
  },
  methods: {
    currentDate() {
      dayjs.extend(LocalizedFormat);
      return dayjs().format('ll');
    },
    async upload() {
      this.fileFormData = new FormData();
      this.fileFormData.append('company_name', this.company_name);
      this.fileFormData.append('po_reference_number', this.po_reference_number);
      this.fileFormData.append('quantity', this.quantity);
      this.fileFormData.append('description', this.description);
      this.fileFormData.append('uploaded_date', dayjs());
      this.fileFormData.append('due_date', this.due_date);
      this.fileFormData.append('remarks', this.remarks);
      this.fileFormData.append('type', this.type);
      this.fileFormData.append('basic_amount', this.basic_amount);
      this.fileFormData.append('gross_amount', this.gross_amount);
      this.fileFormData.append('currency', this.currency_selected);
      this.fileFormData.append('file', this.file);
      try {
        const res = await this.$axios({
          method: 'post',
          url: '/vendorinvoice',
          data: this.fileFormData,
        });
        this.$toast.success(res.data);
      } catch (error) {
        this.$toast.error('File was not uploaded');
      }
    },
    fileSelect() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
