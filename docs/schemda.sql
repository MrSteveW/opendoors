-- classes --
CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  year_group VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  organization_id TEXT DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access Classes" ON public.classes 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));


-- events --
CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  class_id INT REFERENCES classes(id),
  producer_id INT REFERENCES producers(id),
  time_id INT REFERENCES times(id),
  topic TEXT,
  organization_id TEXT DEFAULT (auth.jwt()->'o'->>'id') 
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access Events" ON public.events 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));


-- events_producers --
CREATE TABLE IF NOT EXISTS events_producers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  producer_id INT NOT NULL REFERENCES producers(id),
  organization_id TEXT DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE events_producers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access EVENTS_PRODUCERS" ON public.events_producers
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- icons --
CREATE TABLE IF NOT EXISTS icons (
  name TEXT PRIMARY KEY CHECK (char_length(name) > 0)
);


-- producers --
CREATE TABLE IF NOT EXISTS producers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  organization_id TEXT DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE producers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access Producers" ON public.producers 
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));

-- times --
CREATE TABLE IF NOT EXISTS times (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  display_order INT NOT NULL,
  icon VARCHAR(255),
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  organization_id TEXT DEFAULT (auth.jwt()->'o'->>'id')
);

ALTER TABLE times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sch Access times" ON public.times
FOR ALL
TO authenticated
USING (organization_id = (auth.jwt()->'o'->>'id'))
WITH CHECK (organization_id = (auth.jwt()->'o'->>'id'));







