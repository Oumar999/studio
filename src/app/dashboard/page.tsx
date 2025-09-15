// src/app/dashboard/page.tsx
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { AnimatedCounter } from '@/components/animated-counter';
import Link from 'next/link';

export default function DashboardPage() {
  const recentSales = [
    {
      id: '1',
      user: 'Olivia Martin',
      item: 'Surprise Bag - Pastries',
      amount: 4.99,
    },
    {
      id: '2',
      user: 'Jackson Lee',
      item: 'Surprise Bag - Groceries',
      amount: 7.5,
    },
    {
      id: '3',
      user: 'Isabella Nguyen',
      item: 'Surprise Bag - Pastries',
      amount: 4.99,
    },
    {
      id: '4',
      user: 'William Kim',
      item: 'Surprise Bag - Meal',
      amount: 9.0,
    },
    {
      id: '5',
      user: 'Sofia Davis',
      item: 'Surprise Bag - Pastries',
      amount: 4.99,
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €<AnimatedCounter target={1250.75} decimals={2} />
            </div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bags Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter target={215} />
            </div>
            <p className="text-xs text-muted-foreground">
              +12.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter target={5} />
            </div>
            <p className="text-xs text-muted-foreground">3 available now</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            You made 215 sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.user}</TableCell>
                  <TableCell>{sale.item}</TableCell>
                  <TableCell className="text-right">€{sale.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
