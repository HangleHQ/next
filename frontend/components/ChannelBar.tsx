import HelpIcon from '@material-ui/icons/Help';
import SearchBar from './SearchBar'

const styles = {

    helpIcon: {
        width: 30,
        height: 30,
        marginTop: '-4px',
        cursor: 'pointer',
    },

};

export default function ChannelBar({ channel, guild }) {


    return (
        <div id="channelbar">
            <span> {guild.name} &nbsp; | &nbsp; {channel.name} </span>


            <span id="channelbar-right">
                
                <SearchBar channel={channel} guild={guild} />
                
                &nbsp;&nbsp;&nbsp; { /** some lazy padding */}

                <HelpIcon style={styles.helpIcon} onClick={() => { window.location.href = `${window.CONFIG.BASE_URL}/help` }} />

                

            </span>
        </div>
    )
}