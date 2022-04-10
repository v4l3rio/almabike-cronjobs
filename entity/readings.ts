import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Readings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime'})
    time: string;

    @Column()
    device_id: number;

    @Column()
    sensor_id: number;

    @Column()
    value: number;

}