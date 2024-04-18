-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'WAITING', 'IN_PRODUCTION', 'WAITING_DELIVERY', 'FINISHED');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('CASH', 'PIX', 'CREDIT_CARD');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "is_delivery" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL,
    "form_payment" "Payment" NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "costumerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
