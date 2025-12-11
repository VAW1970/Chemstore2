import { PrismaClient, UserRole, VerificationStatus, UnitType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuários padrão
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@chemstore.com' },
    update: {},
    create: {
      email: 'admin@chemstore.com',
      name: 'Administrador',
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@chemstore.com' },
    update: {},
    create: {
      email: 'user@chemstore.com',
      name: 'Usuário Padrão',
      password: userPassword,
      role: UserRole.USER,
    },
  })

  console.log('👤 Usuários criados:', { admin: admin.email, user: user.email })

  // Criar reagentes de exemplo
  const reagents = [
    {
      name: 'Ácido Sulfúrico',
      brand: 'Química Pura',
      quantity: 25.5,
      unit: UnitType.L,
      expirationDate: new Date('2025-06-15'),
      location: 'Laboratório Principal',
      shelf: 'A-01',
      sector: 'Ácidos',
      userId: admin.id,
      verification: VerificationStatus.VERIFIED,
      notes: 'Concentração 98%',
    },
    {
      name: 'Etanol Absoluto',
      brand: 'LabSolutions',
      quantity: 50.0,
      unit: UnitType.L,
      expirationDate: new Date('2025-03-20'),
      location: 'Laboratório Principal',
      shelf: 'B-02',
      sector: 'Solventes',
      userId: user.id,
      verification: VerificationStatus.VERIFIED,
      notes: 'Grau analítico',
    },
    {
      name: 'Hidróxido de Sódio',
      brand: 'Química Básica',
      quantity: 10.0,
      unit: UnitType.KG,
      expirationDate: new Date('2025-02-10'),
      location: 'Laboratório Químico',
      shelf: 'C-03',
      sector: 'Bases',
      userId: admin.id,
      verification: VerificationStatus.PENDING,
      notes: 'Pérolas',
    },
    {
      name: 'Cloreto de Sódio',
      brand: 'Sal Laboratorial',
      quantity: 5.0,
      unit: UnitType.KG,
      expirationDate: new Date('2026-12-31'),
      location: 'Depósito',
      shelf: 'D-01',
      sector: 'Sais',
      userId: user.id,
      verification: VerificationStatus.VERIFIED,
      notes: 'Grau PA',
    },
    {
      name: 'Ácido Clorídrico',
      brand: 'Química Forte',
      quantity: 15.0,
      unit: UnitType.L,
      expirationDate: new Date('2025-01-15'),
      location: 'Laboratório Principal',
      shelf: 'A-02',
      sector: 'Ácidos',
      userId: admin.id,
      verification: VerificationStatus.VERIFIED,
      notes: 'Concentração 37%',
    },
  ]

  for (const reagent of reagents) {
    await prisma.reagent.upsert({
      where: { id: `${reagent.name}-${reagent.brand}` },
      update: {},
      create: reagent,
    })
  }

  console.log('🧪 Reagentes de exemplo criados:', reagents.length)
  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


