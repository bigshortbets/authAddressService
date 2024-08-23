-- CreateTable
CREATE TABLE "AddressRecord" (
    "id" SERIAL NOT NULL,
    "ethAddress" TEXT NOT NULL,
    "ss58Address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddressRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddressRecord_ethAddress_key" ON "AddressRecord"("ethAddress");

-- CreateIndex
CREATE UNIQUE INDEX "AddressRecord_ss58Address_key" ON "AddressRecord"("ss58Address");
