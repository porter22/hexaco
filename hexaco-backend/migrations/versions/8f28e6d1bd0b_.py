"""empty message

Revision ID: 8f28e6d1bd0b
Revises: c2826081a1e7
Create Date: 2023-09-17 20:51:22.013341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f28e6d1bd0b'
down_revision = 'c2826081a1e7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scheduled_assessments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('assessment_category', sa.String(), nullable=False))
        batch_op.drop_column('assessment_type')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scheduled_assessments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('assessment_type', sa.VARCHAR(), autoincrement=False, nullable=False))
        batch_op.drop_column('assessment_category')

    # ### end Alembic commands ###