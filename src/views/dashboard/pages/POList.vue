<template>
  <v-container
    id="po-list"
    tag="section"
  >
    <v-list two-line>
      <v-list-item-group
        v-model="selected"
      >
        <template
          v-for="(item, index) in items"
        >
          <v-list-item
            :key="item.ezpaDocNo" 
            :to="{name: 'Purchase Order Detail', params: {id: item.ezpaDocNo}}" 
          >
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.ezpaDocNo" />
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                />
                <v-list-item-subtitle v-text="item.ezpaSoldTo" />
              </v-list-item-content>
  
              <v-list-item-action>
                <v-list-item-action-text v-text="item.ezpaCreatedOn" />
                <!--<v-icon
                      v-if="!active"
                      color="grey lighten-1"
                    >
                      star_border
                    </v-icon>
  
                    <v-icon
                      v-else
                      color="yellow"
                    >
                      star
                    </v-icon>-->
              </v-list-item-action>
            </template>
          </v-list-item>
  
          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          />
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'DashboardDataTables',

    data: () => ({
      selected: [2],
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
