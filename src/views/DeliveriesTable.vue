<template>
  <v-container>
    <v-data-table
      data-app
      :headers="headers"
      :items="orders"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:item.state_id="{ item }">
        {{ $store.getters.getNameState(item.state_id) }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >Pedidios a repartir de: {{ dealerName }}</v-toolbar-title
          >

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        disabled
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="states"
                        item-text="name"
                        item-value="id"
                        v-model="editedItem.state_id"
                        label="Estado"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        disabled
                        v-model="editedItem.address"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Actualizar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>

      <template v-slot:no-data>
        <div class="d-flex justify-space-between">
          <div>
            <div class="grey--text mb-2 no-product-text">
              <h3>
                No tiene ningún producto para repartir, vuelva a cargar la
                tabal.
              </h3>
            </div>
          </div>
        </div>

        <v-btn color="btn-primary" @click="initialize">
          Volver a cargar los pedidos
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
        class: "s-red s-light",
      },
      {
        text: "Usuario",
        value: "userName",
        sortable: false,
        class: "s-red s-light",
      },
      { text: "Dirección", value: "address", class: "s-red s-light" },
      {
        text: "Cantidad",
        value: "orderLine.quantity",
        sortable: true,
        class: "s-red s-light",
      },
      { text: "Estado", value: "state_id", class: "s-red s-light" },
      { text: "Pedido", value: "created_at", class: "s-red s-light" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        class: "s-red s-light",
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    states() {
      return this.$store.state.states;
    },
    dealerName() {
      return this.$store.getters.getNameUser;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Editar estado";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      // Pedir las orders del repartidor logeado
      if (this.$store.getters.getAuth) {
        this.$store
          .dispatch("allOrdersDealer", Number(this.$store.getters.getIdUser))
          .then(() => {})
          .catch((err) => alert(err.message || err));
      } else {
        this.$router.push("/login");
      }
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.state_id = Number(this.editedItem.state_id);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("changeOrder", this.editedItem);
        //Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #2b59c3 !important;
  border: 1px solid #2b59c3;
  color: #fff;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active {
  background-color: transparent !important;
  border-color: #2b59c3 !important;
  box-shadow: none !important;
  color: #2b59c3 !important;
}

.no-product-text {
  padding: 10px;
}
</style>