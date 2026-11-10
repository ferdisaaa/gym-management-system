import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membership_plans')
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Postgres mengembalikan decimal sebagai string, jadi diubah ke number
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  // durasi dalam hari
  @Column()
  durationDays: number;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;
}