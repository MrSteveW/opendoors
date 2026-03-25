CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  year_group VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS producers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS times (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  display_order INT NOT NULL,
  icon VARCHAR(255),
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class_id INT NOT NULL,
  producer_id INT NOT NULL,
  time_id INT NOT NULL,
  topic TEXT,
  
    FOREIGN KEY (class_id)
    REFERENCES classes(id),
    FOREIGN KEY (producer_id)
    REFERENCES producers(id),
    FOREIGN KEY (time_id)
    REFERENCES times(id)
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE producers ENABLE ROW LEVEL SECURITY;
ALTER TABLE times ENABLE ROW LEVEL SECURITY;

ALTER TABLE classes ADD COLUMN organization_id text SET DEFAULT (auth.jwt()->'o'->>'id');
ALTER TABLE events ADD COLUMN organization_id text SET DEFAULT (auth.jwt()->'o'->>'id');
ALTER TABLE producers ADD COLUMN organization_id text SET DEFAULT (auth.jwt()->'o'->>'id');
ALTER TABLE times ADD COLUMN organization_id text SET DEFAULT (auth.jwt()->'o'->>'id');

CREATE POLICY "Sch Access Classes" ON public.classes 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

CREATE POLICY "Sch Access Events" ON public.events 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

CREATE POLICY "Sch Access Producers" ON public.producers 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

CREATE POLICY "Sch Access times" ON public.times
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));