<!--
Copyright 2021-2023 Peter Repukat - FlatspotSoftware

Use of this source code is governed by the MIT
license that can be found in the LICENSE file or at
https://opensource.org/licenses/MIT.
-->

<script lang="ts">
import { ComponentsApi } from '../api/components';
import { MapApi } from '../api/map';
import { PlayerInfoApi } from '../api/playerinfo';



const sectorShips = (async () => {
    
    const playerShip = await PlayerInfoApi.getPlayerOccupiedShipID();
    const [sectorId] = await ComponentsApi.getComponentData<number[]>(playerShip, ['sectorid']);
    const ships = await MapApi.getSectorShips(sectorId);


})();

</script>


<div class="wrapper">
    <div>
    
        <p>There will be a sectormap, soon™</p>
    
    </div>
</div>

<style lang="postcss">

    .wrapper {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
    }

</style>