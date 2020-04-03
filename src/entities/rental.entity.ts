import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Account, Product, Item } from '.';
import { RentalStatus } from '../common/enums';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  pickupTime: Date;

  @Column({ enum: RentalStatus, default: RentalStatus.NEW })
  status: RentalStatus;

  @Column({ type: 'float' })
  depositTotal: number;

  @Column({ type: 'float' })
  priceTotal: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  /**
   * Relations
   */
  @ManyToOne(
    () => Account,
    account => account.requestedRentals
  )
  @JoinColumn({ name: 'requestedBy' })
  requestedBy: Account;

  @ManyToOne(
    () => Account,
    account => account.acceptedRentals
  )
  @JoinColumn({ name: 'acceptedBy' })
  acceptedBy: Account;

  @ManyToMany(() => Product)
  @JoinTable()
  requestedProducts: Product[];

  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];
}
