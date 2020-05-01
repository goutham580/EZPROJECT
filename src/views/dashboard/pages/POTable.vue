<template>
  <v-container
    id="po-list"
    tag="section"
  >
    <base-material-card
      color="indigo"
      icon="mdi-briefcase"
      inline
      class="px-5 py-3"
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          Purchase Orders
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['ezpaDocNo']"
        :sort-desc="[false, true]"
        multi-sort
      />
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      headers: [
        {
          text: 'PO No',
          value: 'ezpaDocNo',
        },
        {
          text: 'Vendor',
          value: 'ezpaSoldTo',
        },
        {
          text: 'Created On',
          value: 'ezpaCreatedOn',
        },
        {
          text: 'Created By',
          value: 'ezpaCreatedBy',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
      search: undefined,
    }),
    computed: {
      ...mapState({
        items: state => state.purchaseorders.items
      })
    },
    created () {
      this.fetchPurchaseOrders()
      /*
      Promise.all([this.fetchPurchaseOrders()])
        .then(() => this.pageLoader_resolveData())
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })
      */
    },
    methods: {
      ...mapActions('purchaseorders', ['fetchPurchaseOrders'])
    }
  }
</script>
