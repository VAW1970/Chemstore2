import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatUnit } from '@/utils/units'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // valid, warning, expired, all
    const sector = searchParams.get('sector')

    let where: any = {}

    // Filtro por status de vencimento
    if (status && status !== 'all') {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)

      switch (status) {
        case 'valid':
          where.expirationDate = { gt: thirtyDaysFromNow }
          break
        case 'warning':
          where.expirationDate = {
            gt: now,
            lte: thirtyDaysFromNow
          }
          break
        case 'expired':
          where.expirationDate = { lte: now }
          break
      }
    }

    // Filtro por setor
    if (sector) {
      where.sector = sector
    }

    const reagents = await prisma.reagent.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { sector: 'asc' },
        { name: 'asc' },
      ],
    })

    // Gerar PDF
    const doc = new jsPDF()

    // Cabeçalho
    doc.setFontSize(20)
    doc.text('ChemStore - Relatório de Inventário', 20, 20)

    doc.setFontSize(12)
    doc.text(`Data de geração: ${new Date().toLocaleDateString('pt-BR')}`, 20, 35)

    let filterText = 'Todos os reagentes'
    if (status && status !== 'all') {
      const statusLabels = {
        valid: 'Válidos',
        warning: 'Por vencer',
        expired: 'Vencidos',
      }
      filterText = `Reagentes ${statusLabels[status as keyof typeof statusLabels]}`
    }
    if (sector) {
      filterText += ` - Setor: ${sector}`
    }
    doc.text(`Filtro: ${filterText}`, 20, 45)

    // Preparar dados para a tabela
    const tableData = reagents.map(reagent => {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)

      let status = 'Válido'
      if (reagent.expirationDate <= now) {
        status = 'Vencido'
      } else if (reagent.expirationDate <= thirtyDaysFromNow) {
        status = 'Por vencer'
      }

      return [
        reagent.name,
        reagent.brand,
        `${reagent.quantity} ${formatUnit(reagent.unit)}`,
        new Date(reagent.expirationDate).toLocaleDateString('pt-BR'),
        `${reagent.location} - ${reagent.sector} (${reagent.shelf})`,
        status,
        reagent.user.name,
      ]
    })

    // Adicionar tabela
    autoTable(doc, {
      head: [['Reagente', 'Marca', 'Quantidade', 'Validade', 'Localização', 'Status', 'Responsável']],
      body: tableData,
      startY: 55,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 40 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25 },
      },
    })

    // Estatísticas
    const validCount = reagents.filter(r => {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)
      return r.expirationDate > thirtyDaysFromNow
    }).length

    const warningCount = reagents.filter(r => {
      const now = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(now.getDate() + 30)
      return r.expirationDate > now && r.expirationDate <= thirtyDaysFromNow
    }).length

    const expiredCount = reagents.filter(r => r.expirationDate <= new Date()).length

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 20 : 120
    doc.setFontSize(10)
    doc.text(`Total de reagentes: ${reagents.length}`, 20, finalY)
    doc.text(`Válidos: ${validCount}`, 20, finalY + 10)
    doc.text(`Por vencer (30 dias): ${warningCount}`, 20, finalY + 20)
    doc.text(`Vencidos: ${expiredCount}`, 20, finalY + 30)

    // Rodapé
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      )
    }

    // Retornar PDF como buffer
    const pdfBuffer = doc.output('arraybuffer')

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=inventario-chemstore.pdf',
      },
    })
  } catch (error) {
    console.error('Erro ao gerar relatório:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
