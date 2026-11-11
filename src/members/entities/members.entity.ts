import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Membership } from '../../memberships/entities/memberships.entity';
import { SessionParticipant } from '../../session-participants/entities/session-participant.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'date', nullable: true })
  birthDate: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @OneToMany(() => SessionParticipant, (participant) => participant.member)
  sessionParticipants: SessionParticipant[];

  @OneToMany(() => Membership, (membership) => membership.member)
  memberships: Membership[];
}