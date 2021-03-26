<template>
    <div>
        <v-select
            @change="getPilih"
            dense
            :items="itemKabkot"
            v-model="pilihKabkot"
            item-text="namaKabkot"
            item-value="kodeKabkot"
            label="Filter"
            style="z-index: 9999;"
        >      
        </v-select>           
    </div>
</template>

<script>
import kabkot from '../../../../config/listKabkot'
export default {
    data() {
        return {
            itemKabkot: kabkot,
            pilihKabkot: ''
        }
    },
    methods: {
        getPilih: function() {
            this.$emit('fetchDataFilter', this.pilihKabkot)
        },
    },
    created() {
        this.itemKabkot.unshift({
            namaKabkot: 'Tampilkan Semua',
            kodeKabkot: 32 
        })
    }
}
</script>