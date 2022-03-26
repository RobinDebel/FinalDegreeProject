<template>
  <div>
        <v-card class="mb-6"  v-for="device in devices" :key="device.id" elevation="5" > 
            <v-card-title>{{ device.devicename }}</v-card-title>
            <v-card-text>Device id: {{ device.deviceid }} </v-card-text>
            <v-card-text>Location: Longitute: {{ device.longitude }} Latitude: {{ device.latitude }}</v-card-text>
            <map-lat-long
                  v-if="device.latitude && device.longitude"
                  v-bind:lat="device.latitude"
                  v-bind:long="device.longitude"
                  v-bind:device="device.id"
                   :style="{'height': `35vh`}"  
                />
            <v-card-actions>
                <v-btn text :to="{ name: 'DeviceInfo', params: { id: device.id } }">
                    See data
                </v-btn>
            </v-card-actions>
        </v-card>



        

    </div>
</template>

<script>

import { mapState} from 'vuex';
import MapLatLong from '@/components/MapLatLong.vue';

export default {
    name:"devices",
    components: {
        MapLatLong
    },

    data(){
        return {
            device: {}
        }
    },

    async beforeCreate(){
        await this.$store.dispatch('getAllDevices');
        this.device = this.$store.state.devices
    },

    computed:{
        ...mapState([
            'devices'
        ]),
    }


}
</script>
