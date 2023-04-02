<script lang="ts">
import { Duration } from 'luxon';
import { gameCommons } from '../store/gameCommons';
import { playerInfo } from '../store/playerInfo';
import { formatNumber, X4BaseDate, X4DateStr } from '../utils/x4utils';
$: pInfo = $playerInfo;
$: commons = $gameCommons;


</script>

<div>
    <p>
        {pInfo.playerName ?? ' '}
    </p>
    <p>
        {pInfo.playerFactionName ?? ' '}
    </p>
    <p>
        {formatNumber(pInfo.playerMoney ?? 0, 'Cr')}
    </p>
    <p>
        {
            X4DateStr(
                X4BaseDate()
                    .plus(
                        Duration.fromMillis((commons.currentGameTime ?? 0) * 1000)
                    )
            )
        }
    </p>
</div>
