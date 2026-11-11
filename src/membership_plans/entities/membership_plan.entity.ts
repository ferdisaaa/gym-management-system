import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Membership } from '../../memberships/entities/memberships.entity';

@Entity('membership_plans')
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @Column()
  durationDays: number;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => Membership, (membership) => membership.plan)
  memberships: Membership[];
}