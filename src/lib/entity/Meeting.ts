import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;
}
