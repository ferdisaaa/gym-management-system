import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { TrainingSession } from '../../training-sessions/entities/training-session.entity';

@Entity('trainers')
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', nullable: true })
  specialization: string | null;

  @OneToMany(
    () => TrainingSession,
    (session) => session.trainer,
  )
  trainingSessions: TrainingSession[];
}