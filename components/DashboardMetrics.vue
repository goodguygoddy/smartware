<template>
  <div>
    <dl class="grid grid-cols-1 gap-5 sm:grid-cols-5">
      <div
        v-for="item in stats"
        :key="item.name"
        class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
      >
        <dt class="text-sm font-medium text-black truncate">
          {{ item.name }}
        </dt>
        <dd class="mt-1 text-2xl font-semibold" :class="item.color">
          <div v-if="item.format === 'currency'">
            {{ item.stat | toCurrency }}
          </div>
          <div v-else>
            {{ item.stat }}
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
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
      stats: [
        {
          name: '#Total Bills',
          stat: 100,
          color: 'text-gray-500',
          format: 'number',
        },
        {
          name: '#Bills Pending',
          stat: 60,
          color: 'text-red-500',
          format: 'number',
        },
        {
          name: '#Bills Paid',
          stat: 40,
          color: 'text-green-500',
          format: 'number',
        },
        {
          name: 'Amount Pending',
          stat: 420,
          color: 'text-red-500',
          format: 'currency',
        },
        {
          name: 'Amount Paid',
          stat: 120,
          color: 'text-green-500',
          format: 'currency',
        },
      ],
    };
  },
};
</script>
