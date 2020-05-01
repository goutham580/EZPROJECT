<template>
  <v-container
    id="panels"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card class="my-0">
          <v-card-text>
            <base-subheading
              text="PO Details"
            />

            <base-material-tabs color="warning">
              <v-tab
                v-for="(tab, i) in tabs"
                :key="i"
              >
                {{ tab }}
              </v-tab>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text>
                    <v-form>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-text-field
                              v-model="poDetail.poheader.poNumber"
                              label="PO No"
                              disabled
                            />
                          </v-col>
  
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-text-field
                              v-model="poDetail.poheader.poDate"
                              label="PO Date"
                              disabled
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-text-field
                              v-model="poDetail.poheader.soldTo"
                              label="Vendor"
                              disabled
                            />
                          </v-col>
  
                          <v-col
                            cols="12"
                            sm="6"
                          >
                            <v-text-field
                              v-model="poDetail.poheader.netAmt"
                              label="Net Amount"
                              disabled
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-expansion-panels>
                      <v-expansion-panel
                        v-for="(item, n) in poDetail.poitems"
                        :key="n"
                      >
                        <v-expansion-panel-header>
                          <!-- Item No : {{ item.itemNo }}  Material : {{ item.material }} Description : {{ item.description }} -->
                          <v-row
                            align="center"
                            justify="start"
                          >
                            <v-avatar class="grey lighten-2 mr-2 mr-sm-4">
                              <span v-text="item.itemNo" />
                            </v-avatar>
                            <span
                              class="pa-2"
                              v-text="item.material"
                            />
                            <span
                              class="pa-2"
                              v-text="item.description"
                            />
                            <v-chip
                              class="ma-2"
                              color="indigo"
                              text-color="white"
                            >
                              <v-avatar left>
                                <v-icon>mdi-weight</v-icon>
                              </v-avatar>
                              <span v-text="item.qty" /> 
                              <span 
                                class="ma-2" 
                                v-text="item.uom" 
                              />
                            </v-chip>

                            <div class="flex-grow-1" /> 
                          </v-row>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                          <v-expansion-panel-content class="grey lighten-4">
                            <v-list-item-group
                              two-line
                              class="pa-0"
                            >
                              <v-list-item
                                v-for="poschedule in item.poSchedules"
                                :key="poschedule.sNo"
                              >
                                <v-list-item-content>
                                  <v-list-item-title v-text="poschedule.deliveryDate" />
                                  <v-list-item-subtitle v-text="poschedule.sNo" />
                                </v-list-item-content>
  
                                <v-list-item-action>
                                   <v-chip
                              class="ma-2"
                              color="indigo"
                              text-color="white"
                            >
                              <v-avatar left>
                                <v-icon>mdi-weight</v-icon>
                              </v-avatar>
                              <span v-text="poschedule.qty" /> 
                              <span 
                                class="ma-2" 
                                v-text="item.uom" 
                              />
                            </v-chip>
                                </v-list-item-action> 
                              </v-list-item>
                            </v-list-item-group>
                          </v-expansion-panel-content>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </base-material-tabs>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'DashboardPanels',

    data: () => ({
      first: 'test',  
      tab: 0,
      tabs: [
        'Header',
        'Items'
      ],
      tabs2: [
        {
          text: 'Home',
          icon: 'mdi-view-dashboard',
        },
        {
          text: 'Settings',
          icon: 'mdi-clock-outline',
        },
      ],
      tabs3: [
        {
          text: 'Description',
          icon: 'mdi-information',
        },
        {
          text: 'Location',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Legal Info',
          icon: 'mdi-gavel',
        },
        {
          text: 'Help Center',
          icon: 'mdi-help-circle-outline',
        },
      ],
    }),
    computed: {
      ...mapState({
        poDetail: state => state.purchaseorders.item
      })
    },
    created () {
      const poNum = this.$route.params.id
      this.fetchPODetails(poNum)
    },
    methods: {
      ...mapActions('purchaseorders', ['fetchPODetails']) 
    }
  }
</script>
