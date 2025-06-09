-- CreateTable
CREATE TABLE "PasswordResetTokens" (
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateIndex
CREATE INDEX "PasswordResetTokens_userId_idx" ON "PasswordResetTokens"("userId");

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
