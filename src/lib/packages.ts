export type Pkg = {
  name: string;
  category: string;
  was: string;
  now: string;
  amount: number;
};

export const packages: Pkg[] = [
  { name: "Slot Holding", category: "Starter", was: "₹ 3,000", now: "₹ 2,000", amount: 2000 },
  { name: "Expert Wave", category: "Skills", was: "₹ 7,000", now: "₹ 5,000", amount: 5000 },
  { name: "Finance Wave", category: "Finance", was: "₹ 11,000", now: "₹ 9,500", amount: 9500 },
  { name: "Creator Wave", category: "Creator", was: "₹ 20,000", now: "₹ 16,000", amount: 16000 },
  { name: "Tech Wave", category: "Technology", was: "₹ 29,000", now: "₹ 20,000", amount: 20000 },
];

export const UPI_NUMBER = "+91 9315653702";
