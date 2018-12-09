import Reflux from 'reflux';
import { ShowAddteamMemberAction, UpdateTeamMembersList } from './../actions'


export class TeamStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { showAdd: false }; // <- set store's default state much like in React
        this.listenTo(ShowAddteamMemberAction, this.onStatusUpdate); // listen to the statu
     }

    onLoadCompleted(data) {
        // use the data here
    }

    onLoadFailed(message) {
        // failed, with whatever message you sent
    }

    onStatusUpdate(status) {
        this.setState({
            showAdd: status,
        });
    }
    
}