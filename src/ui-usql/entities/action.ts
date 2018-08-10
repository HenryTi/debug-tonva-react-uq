import {Entity} from './entity';

export class Action extends Entity {
    async submit(data:object) {
        await this.loadSchema();
        let text = this.pack(data);
        return await this.tvApi.action(this.name, {data:text});
    }
}

