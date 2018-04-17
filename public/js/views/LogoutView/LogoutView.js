import {View} from '../View/view';
import * as busSingleton from '../../modules/bus';

export class LogoutView extends View {
        create() {
            busSingleton.getInstance().emit('logout');
        }
}
